import {css} from 'styled-components'

const mixins = {
    buttonOne: css`
    color: var(--white);
    background-color: var(--orange);
    width: 160px;
    height: 48px;
    font-size: 13px;
    font-weight: 700;
    line-height: 17.76px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: var(--light-orange);
    }`,
    buttonTwo: css`
    color: var(--black);
    background-color: transparent;
    border: inset 1px var(--black);
    width: 160px;
    height: 48px;
    font-size: 13px;
    font-weight: 700;
    line-height: 17.76px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: var(--black);
        color: var(--white);
    }`,
    buttonThree: css`
    color: var(--white);
    background-color: var(--black);
    width: 160px;
    height: 48px;
    font-size: 13px;
    font-weight: 700;
    line-height: 17.76px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #4C4C4C;
    }
    `,
    flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;`,
    flexBetween: css`
    display: flex;
    align-items: center;
    justify-content: space-between;`,

}

export default mixins