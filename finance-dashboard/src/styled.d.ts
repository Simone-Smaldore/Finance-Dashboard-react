import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        mode: string;
        background: string;
        primary: string;
        primaryDark: string;
        secondary: string;
        cardBglight: string;
        text: string;
        accent: string;
        cardBg: string;
        shadow: string;
        toggleColor: string;
    }
}
