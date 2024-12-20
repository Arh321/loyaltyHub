import { IValidateUser } from "@/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ProfileNotifeProps {
  show: boolean;
  content: {
    severity: "success" | "info" | "warn" | "error" | undefined;
    summary: string;
    detail: string;
  };
}
interface ProfileMissedFieldsProps {
  fields: Array<string>;
  isRequierdMissed: boolean;
}
export interface ProfileSliceType {
  info: IValidateUser;
  customerToken: unknown;
  hasToken: boolean;
  loadingProfile: boolean;
  profileNotifeProps: ProfileNotifeProps;
  profileMissedFields: ProfileMissedFieldsProps;

  profileCompleteDialog: boolean;
}

const initialState: ProfileSliceType = {
  info: {
    firstName: "علیرضا",
    lastName: "حسن زاده",
    mobile: "09123456789",
    job: "",
    birthDate: new Date(),
    nationalCode: "0",
    address: "",
    customerKey: 0,
    buyPriceInYear: 0,
    cityID: 0,
    partnerShipCode: "",
    provinceID: 0,
    customerGroupName: "",
    customerZone: "",
    hasFactor: false,
    educationDegree: "",
    followCommission: 0,
    inviteTypeID: 0,
    marriageDate: null,
    nextLevelPrice: 0,
    sexuality: false,
    tell: "",
    title: "",
    token: null,
    partnerBirthDate: null,
    postalCode: "",
    usedCreditPrice: 0,
    zipCode: "",
  },
  profileCompleteDialog: false,
  customerToken: {
    expires: "",
    issuedAt: "",
    refreshToken: "",
    token: "",
    tokenType: "Bearer",
  },
  hasToken: false,
  loadingProfile: false,
  profileNotifeProps: {
    show: false,
    content: {
      detail: "",
      severity: undefined,
      summary: "",
    },
  },
  profileMissedFields: {
    fields: [],
    isRequierdMissed: false,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onSetToken: () => {
      // state.customerToken = payload.payload;
      // cookies.set("token", payload.payload, {
      //   path: "/",
      //   expires: new Date(payload.payload.expires),
      // });
      // state.hasToken = true;
    },
    onProfileCompleteDialog: (state) => {
      state.profileCompleteDialog = !state.profileCompleteDialog;
    },
    onCheckHasToken: (state) => {
      const token = cookies.get("token");
      if (token) {
        state.customerToken = token;
        state.hasToken = true;
      } else {
        state.hasToken = false;
      }
    },

    onLogOut: (state) => {
      cookies.remove("token", {
        path: "/",
      });
      state.hasToken = false;
    },
    onSetProfile: (state, payload: PayloadAction<IValidateUser>) => {
      state.info = payload.payload;
    },
    onLoadingProfile: (state, payload: PayloadAction<boolean>) => {
      state.loadingProfile = payload.payload;
    },
    onShowNotif: (state, payload: PayloadAction<ProfileNotifeProps>) => {
      state.profileNotifeProps = payload.payload;
    },

    onCheckProfile: (state, payload: PayloadAction<unknown>) => {
      const fields: string[] = [];
      const requierdItems = [
        "nationalCode",
        "lastName",
        "firstName",
        "cellPhone",
      ];
      Object.entries(payload.payload).forEach((i) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        i[1] == null && fields.push(i[0]);
      });
      state.profileMissedFields.fields = fields;
      const tmp = fields.filter((i) => requierdItems.includes(i));
      state.profileMissedFields.isRequierdMissed = tmp.length ? true : false;
    },
  },
});

export const {
  onSetToken,
  onCheckHasToken,
  onLogOut,
  onSetProfile,
  onLoadingProfile,
  onShowNotif,

  onCheckProfile,

  onProfileCompleteDialog,
} = profileSlice.actions;

export default profileSlice.reducer;
