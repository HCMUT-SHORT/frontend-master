import { InputField } from "@/components/InputField";
import { TourCard } from "@/components/TourCard";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { useState, useEffect, useCallback } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { createShareCode, lookupShareCode, joinSharedTour } from "@/hooks/shareData";
import { TourState } from "@/constants/type";
import { setLookupTour, setShareError } from "@/redux/shareSlice";
import { ShareCodeModal } from "@/components/Modal";

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
    height: 20px
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
      lookupShareCode(code, dispatch).catch(() => {
      });
    }
  }, [shareCode, dispatch]);

  const handleShare = async (tour: TourState) => {
    try {
      const code = await createShareCode(tour, token, dispatch);
      setGenCode(code);
      setShareModalVisible(true);
    } catch {
      alert("Không thể tạo mã chia sẻ");
    }
  };

  const handleJoin = async () => {
    try {
      await joinSharedTour(shareCode.trim(), token, dispatch);
      alert("Tham gia tour thành công!");
      setShareCode("");
    } catch {
      alert("Không thể tham gia tour");
    }
  };

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
      </MainContainer>
    </Container>
  );
}
