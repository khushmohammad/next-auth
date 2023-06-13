import { useRouter } from "next/router";
import { enGB, enUS, de } from "../locale";

const useTranslation = () => {
  const router = useRouter();
  const { locale, pathname, asPath } = router;

  const t = locale === "en-GB" ? enGB : locale === "en-US" ? enUS : de;
  const handleLanguageToggle = (lang) => {
    switch (lang) {
      case "en-US":
        router.push(asPath, pathname, { locale: "en-US" });
        break;
      case "en-GB":
        router.push(asPath, pathname, { locale: "en-GB" });
        break;
      case "de":
        router.push(asPath, pathname, { locale: "de" });
        break;
    }
  };
  return { t, handleLanguageToggle };
};

export default useTranslation;
