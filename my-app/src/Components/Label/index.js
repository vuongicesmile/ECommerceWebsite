import React from 'react'

const label = {
    h1: ({ bold = false, children }) => {
        return (
            <h1 style={{ fontWeight: `${bold ? 'bold' : ''}` }}>
                {children}
            </h1>
        )
    },
    titlexs: ({ children }) => {
        return (
            <span
                style={{
                    fontSize: '11px',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                }}
            // className="label-color"
            >
                {children}
            </span>
        );
    },
    titlesm: ({ children }) => {
        return (
            <span
                style={{
                    fontSize: '13px',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                }}
            // className="label-color"
            >
                {children}
            </span>
        );
    },
    titlemd: ({ children }) => {
        return (
            <span
                style={{
                    fontSize: '13px',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                }}
            // className="label-color"
            >
                {children}
            </span>
        );
    },
    titlelg: ({ children }) => {
        return (
            <span
                style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                }}
            // className="label-color"
            >
                {children}
            </span>
        );
    },
    titlexl: ({ children }) => {
        return (
            <span
                style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                }}
            // className="label-color"
            >
                {children}
            </span>
        );
    },
    titlexxl: ({ children }) => {
        return (
            <span
                style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                }}
            // className="label-color"
            >
                {children}
            </span>
        );
    },
}

export { label }