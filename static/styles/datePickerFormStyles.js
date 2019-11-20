import styled, { css } from 'styled-components';

export const Form = styled.form`
  position: relative;
  padding: 1.25rem;
  margin-top: 1.25rem;
  border: 1px solid #adadad;
  border-radius: 0.1875rem;

  strong {
    font-weight: 500;
  }
`;

const inputStyle = css`
  width: 100%;
  padding: 0.625rem 0.625rem 0.625rem 2.5rem;
  font-size: 100%;
  border: 0.0625rem solid #adadad;
  border-radius: 0.1875rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const DateInput = styled.div`
  margin-right: 1.25rem;

  input {
    ${inputStyle};
    background: url('/static/images/icons/date.svg') center left 0.625rem no-repeat;
    background-size: 1.25rem 1.25rem;
  }
`;

export const TimeInput = styled.div`
  input {
    ${inputStyle};
    background: url('/static/images/icons/time.svg') center left 0.625rem no-repeat;
    background-size: 1.25rem 1.25rem;
  }
`;

export const ButtonWrapper = styled.div`
  button {
    width: 100%;
    margin-top: 1.25rem;
    border-radius: 0.1875rem;
    letter-spacing: 0.1em;
    color: #fff;
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;

  &:not(:first-child) {
    margin-top: 0.625rem;
  }

  .react-datepicker {
    &__input-container {
      width: 100%;
    }

    &-popper .react-datepicker__day {
      &--keyboard-selected {
        background-color: transparent;
        color: #000;
      }

      &--selected {
        background-color: ${({ theme }) => theme.colors.dark_primary};
      }
    }

    &--time-only .react-datepicker__time-box {
      border-radius: 0;
    }

    &__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
      overflow-x: hidden;
      padding-bottom: 0.0625rem;
      scroll-behavior: smooth;

      li.react-datepicker__time-list-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.875rem;
        padding: 0.3125rem 0.2rem;
        margin-top: 0.3125rem;

        &:first-child {
          margin-top: 0;
        }

        &--selected {
          background-color: ${({ theme }) => theme.colors.dark_primary};
        }
      }

      &::-webkit-scrollbar {
        width: 0.3125rem;

        &-track {
          -webkit-box-shadow: none;
          background: #f1f1f1;
        }

        &-thumb {
          background-color: #adadad;
        }

        &-corner {
          background-color: #adadad;
        }
      }
    }
  }
`;
