State management: We use the useState hook to manage the form data.
Form handling: The handleSubmit function prevents the default form submission and logs the form data to the console.
Input handling: The handleChange function updates the state whenever the user types in the form fields.

--usestate doesnt work
You're importing a component that needs `useState`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.

    React Server Components (RSC), which is a feature in Next.js 13+ that allows you to run components on the server side by default. React hooks like useState, useEffect, and others that rely on the client-side state cannot be used in server components.
    To fix this error, you need to mark your component as a client component explicitly by adding the "use client" directive at the top of the file where you're using useState.


In Next.js 13+ with React Server Components enabled, you can make your component a client component by adding the "use client" directive at the top of the file.
---
Handling Form Submission to an API (Optional)
If you want to handle the form submission by sending the data to an API, you can do so using fetch or axios. Here's an example of how to submit the form data to a mock API:
In Next.js 13+, the App Directory (app/) has been introduced as an alternative to the pages/ directory.
----
Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor
In Next.js 13 and above, the <Link> component no longer requires an <a> tag inside it, as the href prop is now directly applied to the <Link> component itself. The Link component automatically renders an anchor (<a>) element under the hood, which eliminates the need for the extra <a> tag.
----------------
Nextjs support CSS modules to keep it in scope with in conflict with global.CSS
With CSS Modules, the styles will be scoped to ContactForm.tsx and won’t affect other parts of your app, even if there are conflicting styles in global.css.


Option 3: Inline Styles (Quick but Limited)
If you want a quick solution without adding extra dependencies or CSS files, you can use inline styles directly in your component.
For Scoped Styling: Use CSS Modules or Styled Components for the most scalable and maintainable approach.
