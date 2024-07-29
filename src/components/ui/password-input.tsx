import * as React from "react"

import { Input } from "./input"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (<div className="flex gap-2 items-center">
      <Input type={showPassword ? "text" : "password"} className={className} {...props} ref={ref} />
      {
        showPassword ? 
        <EyeIcon className="select-none" onClick={() => {setShowPassword((prev) => !prev)}} />
        : <EyeOffIcon className="select-none" onClick={() => {setShowPassword((prev) => !prev)}} />
      }
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
