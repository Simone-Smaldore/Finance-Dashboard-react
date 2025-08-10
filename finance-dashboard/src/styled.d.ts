import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        primary: string;
        secondary: string;
        text: string;
        accent: string;
        cardBg: string;
        shadow: string;
        toggleColor: string;
    }
}
