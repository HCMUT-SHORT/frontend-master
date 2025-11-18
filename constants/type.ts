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
    placesToVisit: PlaceToVisit[]
};