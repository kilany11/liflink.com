import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';

interface LogoProps {
  className?: string;
  showIcon?: boolean;
}

const Logo = ({ className = '', showIcon = true }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      {showIcon && (
        <div className="flex items-center justify-center h-8 w-8 rounded bg-[#0A66C2] text-white mr-2">
          <LinkIcon size={20} />
        </div>
      )}
      <span className="text-2xl font-bold">
        <span className="text-[#0A66C2]">Lif</span>
        <span className="text-[#004182]">link</span>
      </span>
    </Link>
  );
};

export default Logo;