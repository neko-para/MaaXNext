function win_escape_one(arg: string) {
  if (arg.length === 0) {
    return '""'
  }

  let space = false
  let len = arg.length

  for (const ch of arg) {
    switch (ch) {
      case '"':
      case '\\':
        len += 1
        break
      case ' ':
      case '\t':
        space = true
        break
    }
  }

  if (space) {
    len += 2
  }

  if (len === arg.length) {
    return arg
  }

  let buf = ''

  if (space) {
    buf += '"'
  }

  let slash = 0

  for (const ch of arg) {
    switch (ch) {
      case '\\':
        slash += 1
        buf += '\\'
        break
      case '"':
        buf += '\\'.repeat(slash + 1)
        buf += '"'
        break
      default:
        slash = 0
        buf += ch
    }
  }

  if (space) {
    buf += '\\'.repeat(slash)
    buf += '"'
  }

  return buf
}

export function win_args_to_cmd(args: string[]) {
  if (!args) {
    return ''
  }

  return args.map(win_escape_one).join(' ')
}
