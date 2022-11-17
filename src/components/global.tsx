import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  .highcharts-container {
    width: 100% !important;

    svg {
      width: 100% !important;
    }
  }

  body {
    background-color: #0A2239;
  }

  .ant-layout-header {
    padding: 0 24px;

    .ant-menu {
      .ant-menu-overflow-item {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9f9f9f;

        &.ant-menu-item-selected, :hover {
          background-color: transparent;
          color: #ffffff;
        }
      }
    }
  }

  .ant-card {
    border-radius: 0;
    border: none;
    background-color: #ffffff;
  }

  .social-area {
    display: inline-flex;
    align-items: center;
    grid-gap: 12px;
  }

  .social-button {
    background-color: #f0f0f0;
    width: 42px;
    height: 42px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 32px;
    border: none;

    svg {
      color: #0a2239;
      width: 28px;
      height: 28px;
    }
  }

  .ant-layout-footer {
    padding: 32px 24px;
    background-color: #061625;
    min-height: 250px;
    color: #f0f0f0;

    .footer-logo-area {
      display: flex;
      align-items: center;
      grid-gap: 4px;
      
      text-transform: uppercase;

      div {
        display: flex;
        flex-direction: column;
        grid-gap: 18px;
        h1 {
          font-size: 42px;
          color: #ffffff91;
          //background: -webkit-linear-gradient(#fff, #0a2239);
          //-webkit-background-clip: text;
          //-webkit-text-fill-color: transparent;
          margin-bottom: 0;
          line-height: 42px;
          font-weight: 700;
        }
        p {
          line-height: 16px;
          margin-bottom: 0;
          color: #979797;
          font-size: 16px;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
    }
    
    .donation-area{
      display: flex;
      align-items: center;
      grid-gap: 24px;
      border: 1px solid #f0f0f0;
      height: 52px;
      padding-left: 24px;
      font-size: 18px;
      letter-spacing: 1px;
      button {
        height: 100%;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        grid-gap: 8px;
        border: none;
        border-radius: 0;
        padding: 0 24px;
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  
  .copyright{
    background-color: #03070a;
    color: #919191;
    font-size: 14px;
    font-weight: 700;
    padding: 24px;
    text-align: center;
  }
`


export default GlobalStyle