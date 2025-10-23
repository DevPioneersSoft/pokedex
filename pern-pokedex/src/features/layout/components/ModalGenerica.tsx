import { Modal, type ModalProps } from "@mantine/core";

import type { ReactNode } from "react";

export interface ModalGenericaProps extends ModalProps {
    children?: ReactNode;
    footerLeftContent?: ReactNode;
    footerCenterContent?: ReactNode;
    footerRightContent?: ReactNode;
};

export default function ModalGenerica({
    withCloseButton = true,
    size = "md",
    children,
    footerCenterContent,
    footerLeftContent,
    footerRightContent,
    ...props
}: ModalGenericaProps) {
    return (
        <div>
            <Modal
                closeOnEscape={false}
                closeOnClickOutside={false}
                withCloseButton={withCloseButton}
                autoFocus={false}
                size={size}
                transitionProps={{ transition: "scale" }}
                styles={{
                    header: {
                        borderColor: "var(--color-slate-200)",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        alignItems: 'center',
                        background: "linear-gradient(180deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)",
                    },
                    title: {
                        fontSize: "30px",
                        fontWeight: 'bold',
                        flex: 1,
                        textAlign: 'center',
                        color: 'white'
                    },
                    body: {
                        padding: 0,
                    },
                    content: {
                        border: "3px solid var(--color-warning-600)",
                        borderRadius: "12px",
                    },
                    close: {
                        color: 'white',
                        backgroundColor: '(--color-primary-500)'
                    }
                }}
                {...props}
            >
                <div className="p-5">{children}</div>

                <div className="w-full mt-10 p-3 border-t-1 border-t-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
                        <div className="flex justify-center sm:justify-start">
                            {footerLeftContent}
                        </div>
                        <div className="flex justify-center">{footerCenterContent}</div>
                        <div className="flex justify-center sm:justify-end">
                            {footerRightContent}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}