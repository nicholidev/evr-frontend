import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  .highcharts-container {
    width: 100% !important;

    svg {
      width: 100% !important;
    }
  }

  body {
    background-color: #121212;
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
    background-color: #1E1E1E;

    .ant-card-head {
      border-bottom-color: #093847;

      .ant-card-head-title {
        color: #28c3f2;
        font-size: 20px;
      }
    }

    .ant-card-body {
      code {
        color: #ffffff;
        background-color: #181818;
        padding: 4px 12px;
        border-radius: 4px;
      }
    }
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
      color: #121212;
      width: 28px;
      height: 28px;
    }
  }

  .ant-layout-footer {
    padding: 32px 24px;
    background-color: #121212;
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
          //background: -webkit-linear-gradient(#fff, #121212);
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

    .donation-area {
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

  .copyright {
    background-color: #101010;
    border-top: 1px solid #555555;
    color: #919191;
    font-size: 14px;
    font-weight: 700;
    padding: 24px;
    text-align: center;
  }

  .ant-statistic-title {
    font-size: 16px;
    color: #ffffff;
    font-weight: 700;
  }

  .ant-statistic-content-value {
    font-size: 36px;
    font-weight: 600;
    color: #28c3f2;
  }

  .ant-statistic-content-suffix {
    font-size: 24px;
    font-weight: 600;
    color: #28c3f2;
  }

  .ant-input {
    height: 50px;
    background-color: transparent;
    color: #28c3f2;
  }

  .ant-input-group-addon, .ant-input-affix-wrapper {
    background-color: transparent;
  }

  .ant-input-group-wrapper {
    border: 1px solid #28c3f2;
  }

  .ant-input-affix-wrapper {
    padding: 0 24px;
    border: none;
  }

  .ant-input-group-addon {
    left: 0 !important;

    .ant-btn {
      height: 50px;
      width: 150px;
      border-radius: 0 !important;
      background-color: #28c3f2 !important;
      border-color: #28c3f2 !important;
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  .ant-segmented-group {
    height: 55px;
    background-color: transparent;
    border: 1px solid #28c3f2;
    padding: 2px;
    border-radius: 0px;

    .ant-segmented-item-selected {
      background-color: #28c3f2;
      border-radius: 0px;
    }

    .ant-segmented-item-label {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      color: #ffffff;
      text-shadow: 1px 1px 4px #0d4657;
    }

    .ant-segmented-thumb {
      background-color: #28c3f2;
      height: calc(100% - 4px);
      top: 2px !important;
      border-radius: 0px;
    }
  }

  .ant-table {
    background-color: transparent;
    border: 1px solid #28c3f2;

    .ant-table-thead > tr > th {
      background-color: transparent;
    }


    .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover {
      background-color: #ffffff0f;
    }

    .ant-table-tbody > tr.ant-table-placeholder:hover > td {
      background-color: #f0f0f00f;
    }

    .ant-table-cell {
      font-size: 16px;
      color: #b5b5b5;
      border-bottom-color: #28c3f2;
    }

    .ant-empty-description {
      color: #949494;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  .ant-tag {
    background: #1dcbff;
    border-color: #69dcff;
  }

  .ant-list-bordered {
    border: 1px solid #28c3f2;

    h5 {
      color: #b5b5b5;
      font-size: 16px;
    }

    p {
      color: #d3d3d3;
      font-size: 16px;
    }
  }

  .ant-list-split .ant-list-item {
    border-bottom: 1px solid #28c3f2;
  }

  .ant-collapse {
    background-color: transparent;

    .ant-collapse-header {
      display: flex;
      align-items: center !important;

      .ant-collapse-header-text {
        color: #28c3f2;
        font-size: 20px;
      }

      .ant-collapse-expand-icon {
        height: 100%;
        display: flex;
        align-items: center;

        svg {
          color: #28c3f2;
        }
      }
    }

    .ant-collapse-content {
      background-color: transparent;

      p {
        color: #d3d3d3;
        font-size: 16px;
      }
    }
  }

  .highcharts-legend-item {
    text {
      fill: #ffffff !important;
    }
  }

  .no-padding-card {
    .ant-card-body {
      padding: 24px 0;
    }
  }

  .highcharts-yaxis-grid {
    path {
      stroke: #676767;
    }
  }
  
  .highcharts-credits{
    display: none!important;
  }
`


export default GlobalStyle