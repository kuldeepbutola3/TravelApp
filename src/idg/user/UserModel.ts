interface AirLine {
  airlineList?: string;
  Id: number;
  carrierCode: string;
  carrierName: string;
  carrierType: string;
  Error: null;
  select: boolean;
  flightDetailsRequest: string;
}

interface PaymentMode {
  id: number;
  //   userDetails: null;
  paymentGatewayModel: {
    // clientFlag: null;
    id: number;
    pgCode: string;
    description: string;
    pgUrl: string;
    successUrl: string;
    failureUrl: string;
    cancelUrl: string;
    transectionCharge: number;
    // marchentSalt: null;
    // marchentKey: null;
    // accessKey: null;
    // workingKey: null;
    // marchentid: null;
  };
  pgMode: string;
  paymentOption: string;
  cardType: string;
  flatPercentFlag: string;
  pgCharges: string;
  //   updatedBy: null;
  updatedOn: number;
}

export interface UserData {
  //   parentUserIdList: null;
  //   parentUserIdStr: null;
  redirectUrl: string;
  //   userPrincipalSupplierList: null;
  //   fromDate: null;
  //   toDate: null;
  //   selected: false;
  userID: number;
  firstName: string;
  middleName: string;
  agency: string;
  website: string;
  lastName: string;
  address: string;
  email: string;
  mobile: string;
  countryCode: string;
  countryName: string;
  gst: string;
  //   panNumber: null;
  //   pincode: null;
  //   state: null;
  officePhone: string;
  //   createdOn: null;
  //   apprRejectOn: null;
  companyId: number;
  companyName: string;
  //   companyModel: null;
  //   staffId: null;
  city: string;
  //   userType: null;
  //   status: null;
  //   roleMasterModel: null;
  //   agencyCommissionModelList: null;
  //   userArtifactWrapper: null;
  //   smsDetails: null;
  //   mailServiceDetails: null;
  //   parentUser: null;
  //   otpEnabled: null;
  //   userDetailsList: null;
  //   customerFundsModel: null;
  //   supplierDetails: null;
  //   numberOfPages: null;
  //   currentPage: null;
  //   recordPerPage: null;
  //   homePageModels: null;
  pGUserMappingModelList: Array<PaymentMode>;
  airlineList: Array<AirLine>;
  //   enableSeriesBook: null;
  //   staffEnabled: null;
  //   totalRecords: null;
  otp: string;
  //   payApprEnabled: null;
  //   autoCredit: null;
  searchPanelFlag: string;
  //   mobileAppFlag: null;
  //   captchaKey: null;
  //   pageType: null;
}

const demoData = {
  parentUserIdList: null,
  parentUserIdStr: null,
  redirectUrl: 'http://test.besttoursofindia.in/index.html',
  userPrincipalSupplierList: null,
  fromDate: null,
  toDate: null,
  selected: false,
  userID: 1,
  firstName: 'Super',
  middleName: 'Admin',
  agency: null,
  website: 'test.besttoursofindia.in',
  lastName: 'Company',
  address: '1308 B MISION ROAD, DS COLONY ALIPURDUAR 1, ALIPURDUAR JUNCTION.',
  email: 'gapi@gmail.com',
  mobile: '6284123714',
  countryCode: 'IN',
  countryName: 'India',
  gst: 'GST',
  panNumber: null,
  pincode: null,
  state: null,
  officePhone: '23232323',
  createdOn: null,
  apprRejectOn: null,
  companyId: 1,
  companyName: 'ABC',
  companyModel: null,
  staffId: null,
  city: 'NEW DELHI',
  userType: null,
  status: null,
  roleMasterModel: null,
  agencyCommissionModelList: null,
  userArtifactWrapper: null,
  smsDetails: null,
  mailServiceDetails: null,
  parentUser: null,
  otpEnabled: null,
  userDetailsList: null,
  customerFundsModel: null,
  supplierDetails: null,
  numberOfPages: null,
  currentPage: null,
  recordPerPage: null,
  homePageModels: null,
  pGUserMappingModelList: [
    {
      id: 101,
      userDetails: null,
      paymentGatewayModel: {
        clientFlag: null,
        id: 1,
        pgCode: 'PAYUMONEYPG',
        description: 'PayUMoney',
        pgUrl: 'https://testtxncdn.payubiz.in/login',
        successUrl: 'http://testapi.besttoursofindia.in/v1/service/payment-gateway/successpayment',
        failureUrl: 'http://test.besttoursofindia.in/index.html#/bookingFail.html',
        cancelUrl: 'http://test.besttoursofindia.in/index.html#/bookingCancel.html',
        transectionCharge: 0,
        marchentSalt: null,
        marchentKey: null,
        accessKey: null,
        workingKey: null,
        marchentid: null,
      },
      pgMode: 'Credit Card',
      paymentOption: 'CRDC',
      cardType: 'CRDC',
      flatPercentFlag: 'F',
      pgCharges: '0',
      updatedBy: null,
      updatedOn: 1613282910000,
    },
  ],
  airlineList: [
    {
      airlineList: null,
      Id: 828,
      carrierCode: 'SG',
      carrierName: 'Spice Jet',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 832,
      carrierCode: '6E',
      carrierName: 'Indigo',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 827,
      carrierCode: 'G8',
      carrierName: 'Go Air',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 834,
      carrierCode: 'GDS',
      carrierName: 'GDS',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 835,
      carrierCode: 'ANY',
      carrierName: 'All',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 831,
      carrierCode: 'UK',
      carrierName: 'Air Vistara',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 829,
      carrierCode: 'AI',
      carrierName: 'Air India',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
    {
      airlineList: null,
      Id: 833,
      carrierCode: 'I5',
      carrierName: 'Air Asia',
      carrierType: 'NA',
      Error: null,
      select: false,
      flightDetailsRequest: null,
    },
  ],
  enableSeriesBook: null,
  staffEnabled: null,
  totalRecords: null,
  otp: '1',
  payApprEnabled: null,
  autoCredit: null,
  searchPanelFlag: 'N',
  mobileAppFlag: null,
  captchaKey: null,
  pageType: null,
};
