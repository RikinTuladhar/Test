import React,{FC} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type InputFormProps = {
    label: string;
    placeholder: string;
    type: string;
    id:string;
    name:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value:string;
};
const InputForm:FC<InputFormProps> = ({value,label,placeholder,type,id,name,onChange}) => {
  return (
    <div className="w-full py-1">
      <Label className="font-bold" htmlFor="email">{label}</Label>
      <Input value={value} onChange={onChange} id={id} name={name} type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputForm;
