import { test, expect } from 'vitest'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "./Button"
import { useState } from "react"


function TestButton() {
  const [clicked, setClicked] = useState(false)

   return <Button
    type="button"
    onClick={() => setClicked(true)}
   >{clicked ? 'Clicked!' : 'Click me'}</Button> 
}

test('should render button', async () => {
    render(<TestButton />)
    const button = screen.getByText('Click me')
    await userEvent.click(button)
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
})

    