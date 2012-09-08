Next Page for Google Chrome
=======================

Next Page is a extension for Chrome that allows you to navigate to the next, previous, 
or top page using simple keyboard shortcuts. The extension can be found here: 
<a href="https://chrome.google.com/webstore/detail/ioogigbgjmadikfocfdmmdlghogaehca/details">Next Page - Chrome Web Store</a>.

<table>
  <tr>
    <th>Shortcut Key</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>&lt;space bar&gt;</td>
    <td>next page (when scrolled to the bottom)</td>
  </tr>
  <tr>
    <td>ctrl+&lt;right arrow&gt;</td>
    <td>next page</td>
  </tr>
  <tr>
    <td>shift+&lt;space bar&gt;</td>
    <td>previous page (when scrolled to the top)</td>
  </tr>
  <tr>
    <td>ctrl+&lt;left arrow&gt;</td>
    <td>previous page</td>
  </tr>
  <tr>
    <td>ctrl+&lt;up arrow&gt;</td>
    <td>section page</td>
  </tr>
  <tr>
    <td>ctrl+shift+&lt;up arrow&gt;</td>
    <td>top page</td>
  </tr>
</table>

Uses HTML's `rel` attribute on `LINK` and `A` tags to determine where to go. Currently supports:
 * `rel="next"`
 * `rel="prev"`
 * `rel="up"`
 * `rel="top"`