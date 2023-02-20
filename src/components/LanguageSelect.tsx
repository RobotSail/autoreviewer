import { Select } from "flowbite-react";
import type { ChangeEvent } from "react";

type LanguageSelectProps = {
  onLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  languages: string[];
};

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  onLanguageChange,
  languages,
}: LanguageSelectProps) => {
  return (
    <Select id="languages" onChange={onLanguageChange}>
      {languages.map((s) => (
        <option value={s} key={s}>
          {s}
        </option>
      ))}
    </Select>
  );
};
export default LanguageSelect;
