import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

const loader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const checkmarkKeyframe = keyframes`
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 1.75em;
    opacity: 1;
  }
  40% {
    height: 3.5em;
    width: 1.75em;
    opacity: 1;
  }
  100% {
    height: 3.5em;
    width: 1.75em;
    opacity: 1;
  }
`

const Circle = styled.div`
  margin-bottom: 3.5em;
  border: 1px solid rgba(0, 0, 0, 0.2);
  ${(props) => props.loadAnimation ? css`animation: ${loader} 1.2s infinite linear;` : css`animation: none;`};
  ${(props) => props.loadAnimation ? css`border-left-color: #5cb85c;` : css`border-color: #5cb85c;`};
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: 7em;
  height: 7em;
  transition: border 1s ease-out;
`
const Checkmark = styled.div`
  display: block;
  :after{
    opacity: 1;
    height: 3.5em;
    width: calc(3.5em / 2);
    transform-origin: left top;
    border-right: 3px solid #5cb85c;
    border-top: 3px solid #5cb85c;
    content: '';
    left: calc(7em / 6 + 7em / 12);
    top: 3.5em;
    position: absolute;
    animation: ${checkmarkKeyframe} 0.8s ease;
    transform: ${(props) => props.checkmarkAnimation ? 'scaleX(-1) rotate(135deg)' : 'none'};
  }
`

export default function SpinnerToCheckmark({ checkmark }){
  return (
    <Circle loadAnimation={!checkmark}>
      { checkmark ? <Checkmark checkmarkAnimation={checkmark}/> : console.log(checkmark) }
    </Circle>
  )
}

SpinnerToCheckmark.propTypes = {
  checkmark: PropTypes.bool
}
SpinnerToCheckmark.defaultProps = {
  checkmark: false
}
