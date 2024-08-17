import copy from 'clipboard-copy';
import { useToast } from '../ui/use-toast';

export function ShareButton({ link }: { link: string}) {
  const { toast } = useToast();
  return (
        <span className="flex flex-row gap-2 cursor-pointer ml-2" onClick={async () => { await copy(link); toast({ title: "Page URL copied", description: "This products share link is copied to your clipboard" })  }} >
          <img src="/share.svg" width={22} />
          <h2>Share</h2>
        </span>
  )
}
