import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactElement } from "react";


interface CButtonProps {
    text: string;
    leftIcon?: ReactElement;
    onClick: (text: string) => void;
    selected?: string;
    rest?: ButtonProps
}

export const CButton = ({ leftIcon, text, onClick, selected, ...rest }: CButtonProps) => {
    return <Button variant="outline" leftIcon={leftIcon} onClick={() => onClick(text)} bg={selected === text ? "Base_Divider" : "transparent"}
        borderColor="Base_Divider" color="Text_Main" {...rest}>{text}</Button>
}

