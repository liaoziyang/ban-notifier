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
    width: 5px;
    opacity: 1;
  }
  40% {
    height: 8px;
    width:  5px;
    opacity: 1;
  }
  100% {
    height: 8px;
    width:  5px;
    opacity: 1;
  }
`

const Circle = styled.div`
  display: ${(props) => props.visible ? 'inline-block' : 'none'};
  border: 2px solid rgba(0, 0, 0, 0.2);
  ${(props) => props.loadAnimation ? css`animation: ${loader} 1.2s infinite linear;` : css`animation: none;`};
  ${(props) => props.loadAnimation ? css`border-left-color: #ffffff;` : css`border-color: #ffffff;`};
  position: relative;
  vertical-align: top;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transition: border .5s ease-out;
`
const Checkmark = styled.div`
  display: block;
  :after{
    opacity: 1;
    height: 8px;
    width: 5px;
    transform-origin: left top;
    border-right: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
    content: '';
    left: calc(20px / 8 + 20px / 12);
    top: 10px;
    position: absolute;
    animation: ${checkmarkKeyframe} 0.8s ease;
    transform: ${(props) => props.checkmarkAnimation ? 'scaleX(-1) rotate(135deg)' : 'none'};
  }
`

export default function SpinnerToCheckmark({ checkmark, visible }){
  return (
    <Circle loadAnimation={!checkmark} visible={visible}>
      { checkmark ? <Checkmark checkmarkAnimation={checkmark}/> : null }
    </Circle>
  )
}

SpinnerToCheckmark.propTypes = {
  checkmark: PropTypes.bool,
  visible:   PropTypes.bool
}
SpinnerToCheckmark.defaultProps = {
  checkmark: false,
  visible:   false
}
