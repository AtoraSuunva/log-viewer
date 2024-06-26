export default function Home() {
  return (
    <div className="info-layout">
      <h2>Hello There!</h2>
      <p>
        There&apos;s nothing for you here. This is a log viewer for deleted
        message logs generated by my bots, like{' '}
        <a href="https://github.com/AtoraSuunva/smolbot">RobotOtter</a>.
      </p>
      <h3>Can I delete logs?</h3>
      <p>
        Logs are hosted on Discord&apos;s CDN, in the logging channel moderators
        have configured. This site simply serves as a viewer for those logs, and
        relies on Discord to store them. If you have access to the log channel
        and delete message perms, simply delete the message with the attachment.
        It might remain cached here for a while, but it&apos;ll eventually
        expire.
      </p>
      <h3>Why are they on Discord&apos;s CDN?</h3>
      <p>
        Discord is very picky about bot devs storing message content on their
        own servers. I wanted to avoid any headaches (and legal issues) so
        they&apos;re stored on Discord instead. This also means moderators and
        admins can easily manage their own logs, without me needing to process
        emails or build an interface with it.
      </p>
      <h3>I want a log deleted.</h3>
      <p>
        You&apos;ll have to reach out to a moderator or admin in the relevant
        server. I can&apos;t get the message from the log URL so it&apos;s
        impossible on my end to delete the message containing the log. If
        you&apos;re a mod or admin, try searching for one of the IDs in your log
        channel.
      </p>
      <h3>Can I use this log viewer for my own things?</h3>
      <p>
        If you can figure it out, I won&apos;t really stop you. I&apos;d prefer
        if you hosted your own instance of this (it&apos;s open-source and works
        on Cloudflare pages) if you get a decent amount of traffic before this
        starts costing me money. The viewer or archive format <em>can</em> and{' '}
        <em>will</em> change at any time, without warning, so don&apos;t rely on
        this instance for critical things you aren&apos;t prepared to fix
        yourself at any moment.
      </p>
    </div>
  )
}
