export interface KeyStringProps {
  [key: string]: string;
}

export interface KeyNumberProps {
  [key: string]: number;
}

export type CategoryParamsProps = {
  params: {
    urlLevel1: string;
    urlLevel2?: string;
    urlLevel3?: string;
    urlLevel4?: string;
  };
};

export interface NavDataProps {
  level1?: string;
  level2?: string;
  level3?: string;
  level4?: string;
}

export type NavPromiseProps = {
  promise: Promise<NavDataProps[] | undefined>;
};

export type NavLevel = {
  [key: string]: string | NavLevel;
};

export interface ItemsProps {
  colourOther: string[];
  colourOther2: string[];
  size: string[];
  stock: { size: string; amount: number }[];
  value?: string;
  id?: string;
  apn: string;
  colour?: string;
  colourSecondary?: string;
  price?: number;
  image?: string;
  altImages?: string[];
  salePrice?: number;
  clearance?: boolean;
  freeShipping?: boolean;
  level0?: string;
  level1?: string;
  level2?: string;
  level3?: string;
  level4?: string;
  levels?: string[];
  relatedProducts?: string[];
  imageK: string;
  altImagesK: string[];
  parent: string;
  group: string;
}

export type SurveyCreatorProps = {
  promise: Promise<ItemsProps[] | undefined>;
};

export interface ProductData {
  id: string;
  url: string;
  uri: string;
  video: Record<string, unknown>;
  badges: string[];
  altImages: string[];
  SavePrice: string;
  image_url: string;
  FreeShipping: boolean;
  MerchDepartment: number;
  isPreOrderActive: boolean;
  AssortedProducts: boolean;
  FreeShippingMetro: boolean;
  nationalInventory: boolean;
  FulfilmentChannel: number;
  primaryCategoryId: string;
  group_ids: string[];
  apn: number;
  Size: string;
  price: number;
  Colour: string;
  prices: Array<{
    type: string;
    amount: string;
    country: string;
    endDate: string;
    currency: string;
    startDate: string;
  }>;
  is_default: boolean;
  variation_id: string;
  variant_video: Record<string, unknown>;
  SecondaryColour: string;
}

export interface VariationDataProps {
  Colour: string;
  SecondaryColour: string;
  Size: string;
}

export interface ProductInformationProps {
  Material: string[];
  Features: string[];
  "Fit and Model Size": string[];
  "Care Instructions": string[];
}

export interface ProductDetailsProps {
  blurb: string;
  productInformation: ProductInformationProps;
}

export interface ProductDataProps {
  [key: string]: ProductDetailsProps;
}

export interface GroupProps {
  group_id: string;
  display_name: string;
  count: number;
  data: {
    url: string;
    sequence: number;
    identifier: string;
    breadcrumbs: string[];
    defaultCategory: boolean;
  };
  children: never[];
  parents: {
    display_name: string;
    group_id?: string;
  }[];
}
