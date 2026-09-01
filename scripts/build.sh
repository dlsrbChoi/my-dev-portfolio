#!/bin/bash
set +e
next build
NEXT_BUILD_EXIT=$?
node scripts/create-middleware-nft.js
exit $NEXT_BUILD_EXIT
