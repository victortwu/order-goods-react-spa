import { useState } from "react";
import { Box, Button, SpaceBetween } from "@cloudscape-design/components";
import { Copy, Check } from "lucide-react";

interface CopyableIdProps {
  value: string;
  onClick?: () => void;
}

export const CopyableId = ({ value, onClick }: CopyableIdProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <SpaceBetween direction="horizontal" size="xxs" alignItems="center">
      {onClick ? (
        <Button variant="inline-link" onClick={onClick}>
          <Box variant="code">{value}</Box>
        </Button>
      ) : (
        <Box variant="code">{value}</Box>
      )}
      <Button
        variant="inline-icon"
        iconSvg={copied ? <Check size={14} /> : <Copy size={14} />}
        onClick={handleCopy}
        ariaLabel="Copy ID"
      />
    </SpaceBetween>
  );
};
