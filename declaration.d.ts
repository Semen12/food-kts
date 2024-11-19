declare module '*.scss'{
    const content: Record<string, string>;
    export default content;
}

declare module '*.png'{
    const content: string;
   export default content;
}

declare module '*.svg' {
    import React from 'react';
    const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}

