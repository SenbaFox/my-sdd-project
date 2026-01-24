---
description: "Auto-generated tasks for Breakout feature"
---

# Tasks: ブロック崩しゲーム

**Input**: `specs/001-breakout-game/spec.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## フェーズ 1: Setup (共有インフラ)

- [X] T001 Create project web skeleton: create `web/index.html`, `web/styles.css`, `web/src/main.js`, `web/src/game/engine.js`, `web/src/game/physics.js`, `web/src/game/collision.js`, `web/README.md`
- [X] T002 [P] Initialize `package.json` for dev tooling and scripts (root `package.json`)
- [X] T003 [P] Add linters/formatters: configure `.eslintrc.json` and `.prettierrc` at repo root
- [X] T004 [P] Add test runner and config: `jest.config.js` and `tests/setup.js`
- [X] T005 Create CI workflow: `.github/workflows/ci.yml` to run lint + tests on PRs

## フェーズ 2: Foundational (ブロック/ゲーム基盤)

- [X] T006 Create `web/src/game/state.js` for `GameState` model and initializers
- [X] T007 Create `web/src/game/entities/block.js` (Block entity: position, health)
- [X] T008 Create `web/src/game/entities/ball.js` (Ball entity: position, velocity, update)
- [X] T009 Create `web/src/game/entities/paddle.js` (Paddle entity: input handling)
- [X] T010 [P] Implement `web/src/game/renderer.js` (Canvas drawing abstraction)
- [X] T011 Implement `web/src/game/loop.js` (DeltaTime-based game loop)
- [X] T012 Implement `web/src/game/input.js` (keyboard input abstraction and unit-testable API)
- [X] T013 Add basic styles and responsive layout: `web/styles.css`

## フェーズ 3: User Story Implementation (優先度順)

### Phase 3.1 - [US1] ゲーム画面の表示 (P1)

- [X] T014 [US1] Initialize scene and draw 8x8 block grid in `web/src/game/scene.js`
- [X] T015 [US1] Render UI overlays (score/lives/level) in `web/src/game/ui.js`
- [X] T016 [US1] Add accessibility attributes and color-contrast verification notes in `web/index.html` and `web/styles.css`

### Phase 3.2 - [US2] ボード操作 (P1)

- [X] T017 [US2] Implement paddle movement API in `web/src/game/entities/paddle.js`
- [X] T018 [US2] Wire input to paddle and add unit tests in `tests/unit/paddle.test.js`
- [X] T019 [US2] Ensure paddle remains within bounds (logic in `web/src/game/entities/paddle.js`)

### Phase 3.3 - [US3] ボール物理演算 (P1)

- [X] T020 [US3] Implement ball update and basic physics in `web/src/game/entities/ball.js`
- [X] T021 [US3] Add collision detection (circle-rect) in `web/src/game/collision.js` and unit tests `tests/unit/collision.test.js`
- [X] T022 [US3] Integrate `ball` and `loop` to simulate movement; add integration test `tests/integration/ball_loop.test.js`

### Phase 3.4 - [US4] ブロック破壊とダメージシステム (P1)

- [X] T023 [US4] Implement block damage counter logic in `web/src/game/entities/block.js`
- [X] T024 [US4] Update collision handler to increment block damage and remove block at health==0 in `web/src/game/collision.js`
- [X] T025 [US4] Add unit tests for block damage/removal in `tests/unit/block.test.js`
- [X] T026 [US4] Visual damage state (色/エフェクト) implemented in `web/src/game/renderer.js` and `web/styles.css`

### Phase 3.5 - [US7] ライフシステムとゲームオーバー (P1)

- [X] T027 [US7] Implement life decrement and ball reset logic in `web/src/game/state.js`
- [X] T028 [US7] Create `web/src/game/screens/gameover.js` and `web/src/game/screens/cleared.js` UI states
- [X] T029 [US7] Add unit/integration tests for lives and game-over transition in `tests/integration/lives_gameover.test.js`

### Phase 3.6 - [US5] スコアシステムと累積スコア表示 (P2)

- [ ] T030 [P] [US5] Implement score increment on block destroy in `web/src/game/state.js`
- [ ] T031 [P] [US5] Display score updates in `web/src/game/ui.js` with tests `tests/unit/ui_score.test.js`

### Phase 3.7 - [US6] レベルアップシステム (P2)

- [ ] T032 [P] [US6] Implement level tracking and speed multiplier in `web/src/game/state.js`
- [ ] T033 [P] [US6] Add level-up notification UI in `web/src/game/ui.js`
- [ ] T034 [P] [US6] Add tests for level & speed change `tests/unit/level.test.js`

### Phase 3.8 - [US8] ゲームクリア条件 (P2)

- [ ] T035 [P] [US8] Implement win detection (all blocks destroyed) in `web/src/game/state.js`
- [ ] T036 [P] [US8] Implement clear screen and summary (`web/src/game/screens/cleared.js`) and tests `tests/integration/clear.test.js`

## Final Phase: Polish & Cross-cutting Concerns

- [ ] T037 [P] Add sound effects using `howler.js` (files: `web/lib/howler.min.js`, usage in `web/src/game/sound.js`)
- [ ] T038 [P] Performance tuning: measure and fix to hit 60FPS target; add performance notes in `web/README.md`
- [ ] T039 [P] Accessibility audit and fixes; update `web/index.html` and `web/styles.css` with ARIA labels
- [ ] T040 [P] Create `README.md` at repo root with run/build instructions and `web/README.md` with feature-specific notes
- [ ] T041 [P] Prepare `dist/` build and GitHub Pages deploy script (`scripts/deploy-gh-pages.sh`)

## Dependencies (ユーザーストーリー完了順序)

- Foundation (T006-T013) → US1 (T014-T016) → US2 (T017-T019) → US3 (T020-T022) → US4 (T023-T026) → US7 (T027-T029) → US5 (T030-T031) → US6 (T032-T034) → US8 (T035-T036) → Polish (T037-T041)

## Parallel execution examples

- [P] Tasks T002, T003, T004, T005 can run in parallel while core entity files (T006-T009) are developed.
- [P] UI rendering (`T010`) can be implemented in parallel with state models (`T006`) and entities (`T007`-`T009`).
- [P] Score (US5) and Level (US6) tasks (T030-T034) are independent from collision internals and can be developed in parallel after block removal (T024).

## Independent test criteria (ストーリー毎)

- [US1] 画面表示: `web/src/game/scene.js` による8x8ブロック描画、UI要素がDOM/Canvas上に表示されることを自動テストで確認
- [US2] ボード操作: `tests/unit/paddle.test.js` がパドル移動と境界制約を検証
- [US3] 物理: `tests/unit/collision.test.js` が円-矩形衝突と反射を検証
- [US4] ブロック破壊: `tests/unit/block.test.js` が耐久2ロジックを検証
- [US5] スコア: `tests/unit/ui_score.test.js` がスコア増分の反映を検証
- [US6] レベル: `tests/unit/level.test.js` が5破壊でレベル上昇と速度増加を検証
- [US7] ライフ: `tests/integration/lives_gameover.test.js` がライフ減少とゲームオーバー遷移を検証
- [US8] クリア: `tests/integration/clear.test.js` が全ブロック破壊でクリア遷移を検証

## Implementation strategy (MVP first)

- MVP は `US1 + US2 + US3 + US4 + US7` に相当（基本プレイ可能）。まずこれらを T014-T029 で実装・テストしてデモ可能な最小機能を確保する。
- 次に `US5/US6/US8` を追加してスコア・レベル・クリアを完成させる。
- 最後にパフォーマンス・UX・アクセシビリティ・サウンドを整えて公開。

---

**Generated**: 2025-12-13
