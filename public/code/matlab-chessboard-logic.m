%% Q1 - Plot the Board
function Group8_Project()
q4_run_simulation(); % Run the full simulation for the project
end

function plot_board(board,key) % Visualize the 8x8 coin board and highlight the key location
figure;
hold on;
axis equal;
axis([0 8 0 8]);
set(gca, 'xtick', 0.5:1:7.5, 'xticklabel', {'a','b','c','d','e','f','g','h'},'FontName','Times New Roman');
set(gca, 'ytick', 0.5:1:7.5, 'yticklabel', {'1','2','3','4','5','6','7','8'},'FontName','Times New Roman');
title('Chessboard');

for row = 1:8
    for col = 1:8
        x = col - 1;
        y = 8 - row;

        if mod(row + col, 2) == 0
            color = [1 1 1];
        else
            color = [0 0 0];
        end

        rectangle('Position', [x, y, 1, 1], 'FaceColor', color, 'EdgeColor', 'k');

        symbol = 'T';
        if board(row, col) == 1
            symbol = 'H';
        end

        text(x + 0.5, y + 0.5, symbol, 'HorizontalAlignment', 'center', ...
            'VerticalAlignment', 'middle', 'FontSize', 16, 'Color', '#BB5566','FontName','Times New Roman');
    end
end

key_index = bin2dec(key);
row = 9 - (floor(key_index / 8) + 1);
col = mod(key_index, 8) + 1;
x = col - 1;
y = 8 - row;

text(x + 0.4, y + 0.43, 'K', 'HorizontalAlignment', 'right', ...
    'VerticalAlignment', 'top', 'FontSize', 15, 'Color', '#009988','FontName','Times New Roman');

for ytick = [1 3 5 7]
    y_in = 8 - ytick + 0.5;
    line([0, 0.08], [y_in, y_in], 'Color', 'k', 'LineWidth', 0.15);
end

for xtick = [2 4 6 8]
    x_in = xtick - 0.5;
    line([x_in, x_in], [0, 0.08], 'Color', 'k', 'LineWidth', 0.15);
end

hold off;
end

%% Q2 - State of the Board
function [state] = state_of_the_board(board)
board = flipud(board);
state = repmat('0', 1, 6);
coins = reshape(board.', [], 1);

for bit = 0:5
    total = 0;
    for index = 0:63
        if bitget(index, bit + 1)
            total = total + coins(index + 1);
        end
    end

    if mod(total, 2) == 1
        state(6 - bit) = '1';
    end
end
end

%% Q3 - Flip a Coin
function [board] = flip_a_coin(board,state,key_bin)
current_state_bits = state - '0';
key_bits = key_bin - '0';
diff_bits = xor(current_state_bits, key_bits);
flip_index = bin2dec(char(diff_bits + '0'));

row = floor(flip_index / 8) + 1;
col = mod(flip_index, 8) + 1;

row = 9 - row;

board(row, col) = ~board(row, col);
end

%% Q4 - Run Full Simulation
function q4_run_simulation()

close all;

% Generate a random board and key location
board = randi([0 1], 8, 8);
key_location = randi([0 63]);
key_binary = dec2bin(key_location, 6);
key_coord = binary_to_chess(key_binary);
fprintf('Original Key Location: Index = %d, Binary = %s (%s)\n', key_location, key_binary, key_coord);

% Plot original board
plot_board(board, key_binary);
title('Original Board');

% X1 computes board state and flips one coin
state_before = state_of_the_board(board);
new_board = flip_a_coin(board, state_before, key_binary);

% Plot flipped board
plot_board(new_board, key_binary);
title('Board After X1 Flipped a Coin');

% X2 computes state from flipped board to guess key
new_state = state_of_the_board(new_board);
guessed_location = bin2dec(new_state);
guessed_row = floor(guessed_location / 8) + 1;
guessed_col = mod(guessed_location, 8) + 1;
coord = binary_to_chess(new_state);
fprintf('X2 is guessing key location at row %d and column %d (%s)\n', guessed_row, guessed_col, coord);

% Confirm if X2 was correct
if guessed_location == key_location
    fprintf('Player X2 found the key!\n');
else
    fprintf('Player X2 did not find the key.\n');
end
end

function coord = binary_to_chess(binary_str)
index = bin2dec(binary_str);
col_labels = 'abcdefgh';
row_index = floor(index / 8) + 1;
col_index = mod(index, 8) + 1;
coord = sprintf('%c%d', col_labels(col_index), row_index);
end
