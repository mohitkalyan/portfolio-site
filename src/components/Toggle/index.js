import React, { useEffect } from "react"
import { useContext } from "../../context"
import styles from "./toggle.module.css"

export default ({ className }) => {
  const [{ isDarkMode }, dispatch] = useContext()

  let initialDispatch = useContext()[1]

  useEffect(() => {
    initialDispatch({
      type: "isDarkMode",
      value: window.localStorage.getItem("isDarkMode"),
    })
  }, [initialDispatch])

  let handleInput = event => {
    dispatch({
      type: "isDarkMode",
      value: isDarkMode === "true" ? "false" : "true",
    })
  }

  return (
    <input
      type="checkbox"
      aria-label="dark mode toggle"
      className={`${styles.toggle} ${className ? className : ""}`}
      checked={isDarkMode === "true" ? true : false}
      onChange={handleInput}
    />
  )
}
