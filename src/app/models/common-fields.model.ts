export interface CommonFieldsModel {
      extraText?: string;
  description?: string;

  image?: string;
  images?: string[];
  video?: string;
  pdf?: string;

  socialLinks?: {
    label: string;
    url: string;
  }[];

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  active?: boolean;
  featured?: boolean;
}
