export interface Profile {
  firstName: string;
  lastName: string;
}

type SaveProfileResult = {
  isSuccess: boolean;
};

export type SaveProfile = (profile: Profile) => Promise<SaveProfileResult>;

export interface DbService {
  saveProfile: SaveProfile;
}
