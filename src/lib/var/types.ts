export interface Campaign {
  id: string;
  storeName: string;
  itemTitle: string;
  totalStampsReward: number; // e.g., 10 stamps
  rewardName: string; // e.g., "Free Specialty Brew"
  imageUrl: string;
}

export interface UserCard {
  id: string;
  campaignId: string;
  storeName: string;
  rewardName: string;
  stampsCount: number; // current stamps, e.g. 7
  totalNeeded: number; // e.g. 10
  status: "ACTIVE" | "CLAIMED" | "EXPIRED";
  updatedAt: string;
}

export interface EarlyAccessRegistration {
  id: string;
  email: string;
  storeName: string;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: "STAMP_ADD" | "STAMP_REDUCE" | "REWARD_REDEEM" | "REGISTRATION";
  message: string;
  storeName: string;
}
