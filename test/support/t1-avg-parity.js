// Stage-5 wording repairs may move "who said it" from visible prose into AVG speaker metadata.
// Compare full visible wording after removing only supported explicit speaker attribution
// and typographic dialogue quotes. This does not discard any actual dialogue words.
export function normalizeT1AvgParity(text) {
  return text
    .replace(/\{\{student_b\.name\}\}對排班的\{\{student_a\.name\}\}說：/g, '')
    .replace(/\{\{(?:student_[ab]|guardian_[ab])\.name\}\}說：/g, '')
    .replace(/(?:導師|老師|家長)說：/g, '')
    .replace(/[「」]/g, '')
    .replace(/\s/g, '');
}
