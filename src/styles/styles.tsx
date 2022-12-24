import styled from "styled-components";

export const Colors = {
  success: "#006644",
  danger: "#bf2600",
  black: "#000000",
};

export const AppWrapper = styled.div`
  display: flex;
  width: 500px;
  margin-right: auto;
  margin-left: auto;
  flex-direction: column;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LiveSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ResultsWrapper = styled.div`
  position: absolute;
  margin-top: 0.25rem;
  width: 700px;
  max-height: 14rem;
  overflow-y: auto;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding: 0.5rem;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

export const ResultsItem = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    --tw-bg-opacity: 0.1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
  }
`;

export const RenderedItemWrapper = styled.div`
  display: flex;
  cursor: pointer;
  gap: 10px;
  padding: 0.5rem;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export const StyledInput = styled.input`
  outline: 2px solid transparent;
  outline-offset: 2px;
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-width: 2px;
  border-radius: 9999px;
  width: 200px;
  height: 20px;
`;

export const StyledButton = styled.button`
  width: 120px;
  height: 45px;
  margin: 5px;
  border: none;
  outline: none;
  color: rgb(150 81 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;

  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  &:active {
    color: #000;
  }

  &:active:after {
    background: transparent;
  }

  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;
