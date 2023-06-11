import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import pages from '../pages'
import { Button } from 'react-bootstrap'
import { BsGearFill } from 'react-icons/bs'
import setting from '../setting'

function Menu (): JSX.Element {
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  useEffect(() => {
    setCurrentPage(window.location.pathname)
  }, [])

  const PageChanged = (): void => {
    setCurrentPage(window.location.pathname)
  }

  return (
    <>
      <div id="Menu" className={menuIsOpen ? 'on' : ''}>
        {pages.map((page, index: number) => {
          return (
            <Link
              key={index}
              href={page.path}
              className={`btn ${
                currentPage === `${setting.basePath}${page.path}`
                  ? 'btn-primary'
                  : ''
              }`}
              onClick={PageChanged}
            >
              {page.emoji}&nbsp;{page.name}
            </Link>
          )
        })}
      </div>
      <div id="ToMenu">
        <Button
          id="Closer"
          variant="primary"
          className={`btn-close btn-close-white ${menuIsOpen ? 'on' : ''}`}
          onClick={() => {
            setMenuIsOpen(false)
          }}
        ></Button>
        <BsGearFill
          id="Opener"
          className={menuIsOpen ? 'off' : ''}
          onClick={() => {
            setMenuIsOpen(true)
          }}
        ></BsGearFill>
      </div>
    </>
  )
}

export default Menu
