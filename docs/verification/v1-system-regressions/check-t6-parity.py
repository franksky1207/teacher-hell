import hashlib, json, pathlib, re, subprocess
root = pathlib.Path('content/events-v1/T')
source = '6f9fb4a7f3d79153094781e52a62a113a6adad90'
for number in (74, 76, 77, 78, 92, 95, 99, 102):
    id = f'T6-{number:03}'
    path, = root.rglob(id + '.md')
    old = subprocess.check_output(['git', 'show', f'{source}:{path}'], text=True)
    raw = path.read_text()
    def avg(text):
        return json.loads(re.search(r'```avg\s*\n([\s\S]*?)\n```', text)[1])
    def without_wording(value):
        if isinstance(value, dict):
            return {k: without_wording(v) for k, v in value.items() if k != 'text'}
        if isinstance(value, list):
            return [without_wording(v) for v in value]
        return value
    def contract(text):
        return (
            re.search(r'^- \*\*本篇四碼\*\*：.*$', text, re.M)[0],
            re.findall(r'^.*(?:教師狀態|四碼變動|四碼增減|合法底層增減|精神.*熱忱.*情緒.*掌控).*$', text, re.M),
            re.findall(r'^\| [A-D] (?:\| \d+ ){8}\|$', text, re.M),
        )
    a = avg(raw)
    assert without_wording(a) == without_wording(avg(old)), id
    assert contract(raw) == contract(old) and len(contract(raw)[2]) == 4, id
    results = re.findall(r'^- \*\*玩家可見結果\*\*：(.+)$', raw, re.M)
    assert len(results) == 8, id
    for i, result in enumerate(results, 1):
        assert ''.join(page['text'] for page in a['results'][f'R{i}']['pages']) == result, (id, i)
    blob = subprocess.check_output(['git', 'hash-object', str(path)], text=True).strip()
    print(id, blob, '8/8 Markdown–AVG; four codes, V3 and 4×8 equal')
print('story count',sum(1 for p in root.rglob('*.md') if re.fullmatch(r'T[1-6]-[0-9]{3}',p.stem)))
