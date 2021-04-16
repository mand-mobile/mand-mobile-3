import '@mand-mobile/shared/lib/style/global.styl'
// import vConsole from 'vconsole'

<% if (!target) { %>
import './bootstrap.all'
<% } else { %>
import './bootstrap.single'  
<% } %>

// new vConsole()

