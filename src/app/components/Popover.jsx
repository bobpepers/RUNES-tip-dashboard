import React, { useCallback, useState } from 'react'

// import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import { Popover as HeadlessuiPopover } from '@headlessui/react';
// import useInterval from '../../hooks/useInterval';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Popover({
  content, show, children, placement = 'auto',
}) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })
  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  // useInterval(updateCallback, show ? 100 : null)

  return (
    <HeadlessuiPopover>
      <div ref={setReferenceElement}>{children}</div>
      <HeadlessuiPopover.Panel
        static
        className={classNames(!show && 'hidden opacity-0', 'z-50 animate-fade')}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {content}
        <div
          className={classNames('w-2 h-2 z-50')}
          ref={setArrowElement}
          style={styles.arrow}
          {...attributes.arrow}
        />
      </HeadlessuiPopover.Panel>
    </HeadlessuiPopover>
  )
}
