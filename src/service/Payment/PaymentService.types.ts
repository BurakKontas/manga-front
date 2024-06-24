export interface IPaymentService {
    getUserCredit: () => Promise<Result<GetUserCreditResponse>>;
    getItems: () => Promise<Result<GetItemsResponse>>;
    getItem: (itemId: string) => Promise<Result<Item>>;
    createPayment: (itemIds: string[], callbackUri: string, currency: string) => Promise<Result<CreatePaymentResponse>>;
    getPayment: (paymentId: string) => Promise<Result<Payment>>;
}

export type GetUserCreditResponse = {
    credit: number;
    successfullTransactions: Transaction[];
    failedTransactions: Transaction[];
}

export type Transaction = {
    transactionId: string;
    userId: string;
    transactionDate: string;
    transactionType: string;
    amount: number;
    balance: number;
    description: string;
    transactionSuccess: boolean;
    paymentId: string | null;
}

export type GetItemsResponse = {
    items: Item[];
}

export type Item = {
    itemId: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageId: string;
    itemType: string;
    imageUri: string;
};

export type CreatePaymentResponse = {
    created: boolean;
    createdAt: string;
    userId: string;
    token: string;
    checkoutFormContent: string;
    tokenExpireTime: string;
    paymentPageUrl: string;
};

export type Payment = {
    userId: string;                 // UUID
    paymentId: string;              // Ödeme kimliği
    price: number;                  // Fiyat
    paymentDate: string;            // ISO 8601 formatında tarih ve zaman
    cardType: string;               // Kart tipi
    cardLastFourDigits: string;     // Kartın son dört hanesi
    cardFamily: string;             // Kart ailesi
    cardAssociation: string;        // Kart birliği
    itemIds: string[];              // UUID dizisi
};