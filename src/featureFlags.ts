/**
 * Switches for parts of the site that are not ready to show yet.
 * Flip a flag to `true` to turn that part on.
 */
export const featureFlags = {
  /**
   * Project popups. While off, the Playground tiles are plain labels (not
   * clickable) and visiting /projects/:id directly just shows the home page.
   */
  projectPopups: false,
  /**
   * The arrow button on the Resume card that opens the resume file in a new
   * tab. While off, the button is not shown.
   */
  resumeLink: false,
};
