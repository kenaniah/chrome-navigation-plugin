Navigation Shortcuts for Chrome
=======================

Navigation Shortcuts is a extension for Chrome that allows you to navigate to the next, previous, 
or top page using simple keyboard shortcuts. The extension can be found here: 
<a href="https://chrome.google.com/webstore/detail/ioogigbgjmadikfocfdmmdlghogaehca/details">Navigation Shortcuts - Chrome Web Store</a>.

<table>
  <tr>
    <th>Shortcut Key</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>Space Bar</td>
    <td>next page (when scrolled to the bottom)</td>
  </tr>
  <tr>
    <td>Shift + Space Bar</td>
    <td>previous page (when scrolled to the top)</td>
  </tr>
  <tr>
    <th colspan="2">Windows Specific</th>
  </tr>
  <tr>
    <td>Ctrl + Right</td>
    <td>next page</td>
  </tr>
  <tr>
    <td>Ctrl + Left</td>
    <td>previous page</td>
  </tr>
  <tr>
    <td>Ctrl + Up</td>
    <td>section page</td>
  </tr>
  <tr>
    <td>Ctrl + Shift + Up</td>
    <td>top page</td>
  </tr>
  <tr>
    <th colspan="2">Mac Specific</th>
  </tr>
  <tr>
    <td>Option + Right</td>
    <td>next page</td>
  </tr>
  <tr>
    <td>Option + Left</td>
    <td>previous page</td>
  </tr>
  <tr>
    <td>Option + Up</td>
    <td>section page</td>
  </tr>
  <tr>
    <td>Option + Shift + Up</td>
    <td>top page</td>
  </tr>
</table>

Uses HTML's `rel` attribute on `LINK` and `A` tags to determine where to go. Currently supports:
 * `rel="next"`
 * `rel="prev"`
 * `rel="up"`
 * `rel="top"`
 * Autodetection when `rel` links are missing :-)
