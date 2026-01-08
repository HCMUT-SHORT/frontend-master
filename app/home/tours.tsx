import { InputField } from "@/components/InputField";
import { ShareCodeModal } from "@/components/Modal";
import { Popup } from "@/components/PopUp";
import { TourCard } from "@/components/TourCard";
import { COLORS } from "@/constants/Colors";
import { TourState } from "@/constants/type";
import { createShareCode, joinSharedTour, lookupShareCode } from "@/hooks/shareData";
import { setLookupTour, setShareError } from "@/redux/shareSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useFocusEffect } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.LIGHTGREEN};
  padding: 20px;
`;

const MainContainer = styled.View`
  padding-top: 15%;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: "Nunito-SemiBold";
  color: ${COLORS.DARKGREEN};
  margin-bottom: 15px;
`;

const Separator = styled.View`
    height: 20px;
`;

export default function Tours() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();
  const tours = useSelector((state: RootState) => state.tours);
  const shareState = useSelector((state: RootState) => state.share);

  const lookupTour = shareState.lookupTour;
  const loading = shareState.loading;
  const error = shareState.error;

  const [shareCode, setShareCode] = useState("");
  const [genCode, setGenCode] = useState("");
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      Sentry.addBreadcrumb({
        category: "navigation",
        message: "Entered My Tours page",
      });

      return () => {
        Sentry.addBreadcrumb({
          category: "navigation",
          message: "Left My Tours page",
        });
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(setLookupTour(null));
      dispatch(setShareError(null));
      setShareCode("");
    }, [dispatch])
  );

  useEffect(() => {
    const code = shareCode.trim().toUpperCase();

    if (!code) {
      dispatch(setLookupTour(null));
      dispatch(setShareError(null));
      return;
    }

    if (code.length >= 10) {
      Sentry.addBreadcrumb({
        category: "share",
        message: "User attempted share code lookup",
        data: { codeLength: code.length },
      });

      lookupShareCode(code, dispatch).catch((error) => {
        Sentry.captureException(error, {
          tags: {
            feature: "share",
            action: "lookup",
          },
        });
      });
    }
  }, [shareCode, dispatch]);

  const handleShare = async (tour: TourState) => {
    Sentry.addBreadcrumb({
      category: "share",
      message: "User requested share code",
      data: {
        tourId: tour.id,
        destination: tour.destination,
      },
    });

    try {
      const code = await createShareCode(tour, token, dispatch);
      Sentry.captureMessage("Share code generated", {
        level: "info",
        tags: {
          feature: "share",
        },
        extra: {
          tourId: tour.id,
        },
      });
      setGenCode(code);
      setShareModalVisible(true);
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          feature: "share",
          action: "create",
        },
      });
    }
  };

  const handleJoin = async () => {
    Sentry.addBreadcrumb({
      category: "share",
      message: "User attempted to join shared tour",
    });

    try {
      const result = await joinSharedTour(shareCode.trim(), token, dispatch);
      Sentry.captureMessage("Join shared tour result", {
        level: "info",
        tags: {
          feature: "share",
        },
        extra: {
          result,
        },
      });
      setShareCode("");
      if (result === "already_joined") {
            setPopupMessage("Bạn đã tham gia tour");
        } else {
            setPopupMessage("Tham gia tour thành công!");
        }
      setShowPopUp(true)
    } catch (error) {
        Sentry.captureException(error, {
          tags: {
            feature: "share",
            action: "join",
          },
        });
    }
  };
  useEffect(() => {
    if (error) {
      Sentry.captureMessage("Share feature error", {
        level: "warning",
        tags: {
          feature: "share",
        },
        extra: {
          error,
        },
      });
    }
  }, [error]);


  const renderTourCard = ({ item }: { item: TourState }) => (
    <TourCard
      key={item.id}
      type={lookupTour ? "join" : "share"}
      tourId={item.id}
      destination={item.destination}
      imageUrl={item.imageUrl}
      checkInDate={item.checkInDate}
      checkOutDate={item.checkOutDate}
      onShare={() => handleShare(item)}
      onJoin={handleJoin}
    />
  );

  return (
    <Container>
      <MainContainer>
        <Title>Tour của tôi</Title>

        <InputField
          value={shareCode}
          onChange={setShareCode}
          placeholder="Nhập mã tour được chia sẻ"
          fieldType="search"
          keyboardType="default"
        />
        <Separator/>
        {loading && <Title style={{ fontSize: 16 }}>Đang xử lý...</Title>}
        {error && <Title style={{ fontSize: 16, color: "red" }}>{error}</Title>}

        <FlatList
          data={lookupTour ? [lookupTour] : tours}
          keyExtractor={(item) => item.id!}
          renderItem={renderTourCard}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <ShareCodeModal
          visible={isShareModalVisible}
          code={genCode}
          onClose={() => setShareModalVisible(false)}
        />
        <Popup
          visible={showPopUp}
          message={popupMessage}
          onHide={() => setShowPopUp(false)}
        />

      </MainContainer>
    </Container>
  );
}
