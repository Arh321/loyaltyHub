type CompanySocialMedias = {
  instagram: string;
  telegram: string;
  website: string;
  email: string;
};

export type CompanyColors = {
  cta: string;
  "cta-disabled": string;
  "cta-hover": string;
  "cta-focus": string;
  "cta-30": string;
  Highlighter: string;
  "Highlighter-disabled": string;
  "Highlighter-hover": string;
  "Highlighter-focus": string;
  "Highlighter-Faded": string;
  BG: string;
  Alert: string;
  Tritary: string;
  Secondary: string;
  Primary: string;
  Focus: string;
};

export interface ICompanyInfo {
  companyName: string;
  logoUrlFooter: string;
  logoUrl: string;
  "Background-design": string;
  phoneNumbers: string[];
  companyAddress: string;
  companyWebSiteAddress: string;
  companyEmail: string;
  companySocialMedias?: CompanySocialMedias;
  colors?: CompanyColors;
}
