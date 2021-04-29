export interface AuthInfo {
    host: string;
    user: string;
    password: string;
    database: string;
}

export interface CharacterInfo {
    date?: any;
    currentBid?: number;
    auctionStart?: Date | string;
    auctionEnd?: Date | string;
    characterName?: string;
    level?: number;
    vocation?: string;
    sex?: string;
    world?: string;
    obs?: string;
    sold?: string | boolean;
    status?: string;
}
