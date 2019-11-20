import styled from 'styled-components';

export const Title = styled.h3`
  max-width: 40.625rem;
  margin: 0 auto;
  line-height: 1.25;
  letter-spacing: -0.035em;
`;

export const LoginForm = styled.form`
  text-align: left;
  margin-top: 2.5rem;
  background-color: rgb(210, 17, 21);
  margin-bottom: 5rem;
`;

export const LoginFormInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: ${({ size }) => (size === 'small' ? '100%' : '7.5rem')};
    flex-direction: ${({ size }) => (size === 'small' ? 'row' : 'column')};
  }

  button {
    border: 0.125rem solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin: 0 auto;
    border-top: 0;
    padding: 0 0.625rem;
    width: 5.25rem;
    height: 4.375rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
      margin: 0;
      width: ${({ size }) => (size === 'small' ? '3.75rem' : '7.5rem')};
      height: ${({ size }) => (size === 'small' ? '3.75rem' : '7.5rem')};
      border-top: 0.125rem solid #fff;
    }

    svg {
      width: ${({ size }) => (size === 'small' ? '1.875rem' : '2.5rem')};
      height: ${({ size }) => (size === 'small' ? '1.875rem' : '2.5rem')};
    }
  }

  input {
    @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
      width: ${({ size }) => (size === 'small' ? 'calc(100% - 3.75rem)' : 'calc(100% - 7.5rem)')};
    }
  }
`;

export const Input = styled.input`
  padding: 1.25rem;
  border-radius: 0;
  border: 0.125rem solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.375rem;
  font-weight: 400;
  height: 3.75rem;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #fff;
  }

  &:not(:first-child) {
    border-top: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #fff;
    transition: background-color 5000s ease-in-out 0s;
    caret-color: #fff;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    border-right: 0;
  }
`;

export const StyledLink = styled.a`
  text-align: center;
  display: inline-block;
  margin-top: 1.25rem;
  text-decoration-line: underline;
  font-size: 0.875rem;
  color: #fff;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: left;
  }

  &:not(:first-child) {
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin-left: 1.25rem;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 1.25rem;
  margin-bottom: 0.625rem;
`;

export const InputErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const LoginContentLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2.5rem;

  p {
    margin-top: 1.125rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

export const ResetText = styled.p`
  position: absolute;
  top: 6.25rem;
  width: 100%;
  max-width: 28.125rem;
  left: 0;
  right: 0;
  padding: 0 1.25rem;
  margin: 0 auto;
`;
