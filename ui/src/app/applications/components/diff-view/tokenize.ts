import {tokenize, markEdits, MarkEditsType} from 'react-diff-view';
import refractor from 'refractor/core';
import yaml from 'refractor/lang/yaml';
import {HunkData} from 'react-diff-view/types/utils';
import {HunkTokens} from 'react-diff-view/types/tokenize';

// register 'yaml' language for syntax highlighting
refractor.register(yaml);

export default (hunks: HunkData[], editsType: MarkEditsType, oldSource: string, language: string): HunkTokens => {
    if (!hunks) {
        return undefined;
    }
    const options = {
        highlight: language !== 'text',
        refractor: refractor,
        language: language,
        oldSource: oldSource,
        enhancers: [markEdits(hunks, {type: editsType})]
    };
    try {
        return tokenize(hunks, options);
    } catch (ex) {
        return undefined;
    }
};
