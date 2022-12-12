import { css } from '@emotion/react'

export const todoAppStyle = css`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);

    input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }
`

const newTodoPlusEditStyleText = `
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export const newTodoStyle = css`
    ${newTodoPlusEditStyleText}

    .newTodo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
`

export const editStyle = css(newTodoPlusEditStyleText)

export const mainStyle = css`
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
`

export const toggleAllStyle = css`
    text-align: center;
    border: none; /* Mobile Safari */
    opacity: 0;
    position: absolute;

    & + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: -52px;
        left: -13px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    & + label:before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    &:checked + label:before {
        color: #737373;
    }
`

export const todoListStyle = css`
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    li:last-child {
        border-bottom: none;
    }

    li.editing {
        border-bottom: none;
        padding: 0;
    }

    li.editing .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }

    li .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    li .toggle {
        opacity: 0;
    }

    li .toggle + label {
        /*
            Firefox requires # to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the # - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
        */
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
    }

    li .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }

    li label {
        word-break: break-all;
        padding: 15px 15px 15px 60px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    li .edit {
        display: none;
    }

    li.editing:last-child {
        margin-bottom: -1px;
    }
`

export const viewStyle = css`
li.editing & {
    display: none;
}
`

export const destroyStyle = css`
li & {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
}

li &:hover {
    color: #af5b5e;
}

li &:after {
    content: '×';
}

li:hover & {
    display: block;
}
`

export const footerStyle = css`
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;

    &:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
`

export const todoCountStyle = css`
    float: left;
    text-align: left;

    strong {
        font-weight: 300;
    }
`

export const filtersStyle = css`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;

    li {
        display: inline;
    }

    li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }
`

export const selectedStyle = css`
    border-color: rgba(175, 47, 47, 0.2);
`

export const clearCompletedStyle = css`
    &, &:active {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
    }

    &:hover {
        text-decoration: underline;
    }
`

export const infoStyle = css`
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;

    p {
        line-height: 1;
    }

    a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }

    a:hover {
        text-decoration: underline;
    }
`

export const toggleStyle = css`
@media screen and (-webkit-min-device-pixel-ratio:0) {
	li & {
		background: none;
	}

	li & {
		height: 40px;
	}
}
`
