import { TextAreaProps } from '@/types'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, TextAreaProps {}

const Textarea: React.FC<TextAreaProps> = ({
  displayRequired,
  className,
  register,
  fieldname,
  error,
  value = '',
  ...props
}) => {
  return (
    <div>
      {displayRequired && <div className='ml-1 -mb-5 text-red-500'>*</div>}
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...register(fieldname)}
        {...props}
      />
      {error && <span className='text-red-500'>{error.message}</span>}
    </div>
  )
}
Textarea.displayName = 'Textarea'

export default Textarea
