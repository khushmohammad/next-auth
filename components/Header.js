import useTranslation from "../hook/useTranslation";

const Header = () => {
  const { handleLanguageToggle } = useTranslation();
  return (
    <div className="d-flex justify-content-end gap-2 text-secondary">
      <p role="button" onClick={() => handleLanguageToggle("en-US")}>
        English(US)
      </p>
      <p role="button" onClick={() => handleLanguageToggle("en-GB")}>
        English(UK)
      </p>
      <p role="button" onClick={() => handleLanguageToggle("de")}>
        German(de)
      </p>
    </div>
  );
};

export default Header;
