import type { FC } from 'react';
import { Check } from 'lucide-react';
import {
  PanelContainer,
  PanelImage,
  PanelContent,
  IconCircle,
  PanelHeading,
  PanelQuote,
  PanelAttribution,
} from './DesktopDecorativePanel.styles';

interface DesktopDecorativePanelProps {
  /** Background image source URL */
  imageSrc: string;
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Desktop decorative panel with background image, gradient overlay, and inspirational content.
 * Only visible on desktop viewports (hidden on mobile via CSS).
 * Used on the "I'm New Here" page as the right-side decorative panel.
 */
export const DesktopDecorativePanel: FC<DesktopDecorativePanelProps> = ({
  imageSrc,
  className,
}) => {
  return (
    <PanelContainer role="complementary" className={className}>
      <PanelImage src={imageSrc} alt="" aria-hidden="true" />
      <PanelContent>
        <IconCircle>
          <Check data-testid="checkmark-icon" strokeWidth={2} />
        </IconCircle>
        <PanelHeading>Let's get you connected</PanelHeading>
        <PanelQuote>"Come As You Are and Change As You Come"</PanelQuote>
        <PanelAttribution>
          — Nehemiah's Temple of the Apostolic Faith
        </PanelAttribution>
      </PanelContent>
    </PanelContainer>
  );
};
