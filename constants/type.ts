export interface PlaceToVisit {
    id: string;
    name: string;
    detail: string;
    imageUrl: string;
    price: number;
    bestTimeToVisit: string;
    dayVisit: number[];
    rating: number;
    totalRating: number;
};

export interface PlaceToStay {
    id: string;
    name: string;
    detail: string;
    imageUrl: string;
    bookingUrl: string;
    price: number;
    rating: number;
    totalRating: number;
    isSelected: boolean;
    originalSelected: boolean;
};

export interface Transportation {
    id: string;
    type: "flight" | "train" | "self-drive" | "bus";
    time: string;
    bookingUrl: string;
    price: number;
    isSelected: boolean;
    isPossible: boolean;
    originalSelected: boolean;
};

export interface TourState {
    id: string | null;
    createdAt: string | null;
    createdBy: string | null;
    destination: string | null;
    checkInDate: string | null;
    checkOutDate: string | null;
    minBudget: string | null;
    maxBudget: string | null;
    travelType: string | null;
    imageUrl: string | null;
    placesToVisit: PlaceToVisit[];
    changedPlaces: Record<string, number[]>;
    placesToStay: PlaceToStay[];
    changedPlacesStay: Record<string, boolean>;
    transportations: Transportation[];
    changedTransportations: Record<string, boolean>;
};